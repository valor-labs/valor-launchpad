import {
  Tree,
  formatFiles,
  installPackagesTask,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments,
  updateJson,
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/angular/generators';

export default async function (tree: Tree, schema: any) {
  await applicationGenerator(
    tree,
    { name: schema.name }
  );
  const appsRoot = readProjectConfiguration(tree, schema.name).root;
  generateFiles(
    tree,
    joinPathFragments(__dirname, '../../../../../apps/admin'),
    appsRoot,
    schema
  );

  const filePath = `apps/${schema.name}/src/index.html`;
  const contents = tree.read(filePath, 'utf-8');
  const newContents = contents.replace(
    '<title>Admin</title>',
    `<title>${schema.name}</title>`
  );
  tree.write(filePath, newContents);

  updateJson(tree, 'angular.json', (ngJson) => {
    ngJson.projects[schema.name].architect.build.options.assets = [
      `apps/${schema.name}/src/favicon.ico`,
      `apps/${schema.name}/src/assets`,
    ];
    ngJson.projects[schema.name].architect.build.options.styles = [
      `apps/${schema.name}/src/styles.scss`,
      'node_modules/notyf/notyf.min.css',
      'node_modules/jsvectormap/dist/css/jsvectormap.min.css',
      {
        input: `apps/${schema.name}/scss/dark.scss`,
        bundleName: 'dark',
        inject: false,
      },
      {
        input: `apps/${schema.name}/scss/light.scss`,
        bundleName: 'light',
        inject: false,
      },
    ];
    ngJson.projects[
      schema.name
    ].architect.build.options.stylePreprocessorOptions = {
      includePaths: [`apps/${schema.name}/scss/1-variables`],
    };
    return ngJson;
  });

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}