import {
  Tree,
  formatFiles,
  installPackagesTask,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments
} from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/angular/generators';

export default async function (tree: Tree, schema: any) {
  await applicationGenerator(
    tree, // virtual file system tree
    { name: schema.name } // options for the generator
  );
  const appsRoot = readProjectConfiguration(tree, schema.name).root;
  generateFiles(
    tree,
    joinPathFragments(__dirname, '../../../../../apps/api'), // path to the file templates
    appsRoot, // destination path of the files
    schema // config object to replace variable in file templates
  );
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}