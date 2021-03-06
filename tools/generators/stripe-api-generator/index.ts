import { Tree, formatFiles, installPackagesTask, readProjectConfiguration, generateFiles, joinPathFragments } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function (tree: Tree, schema: any) {
  await libraryGenerator(tree, { name: schema.name });
  const libsRoot = readProjectConfiguration(tree, schema.name).root;
  generateFiles(
    tree,
    joinPathFragments(__dirname, '../../../../../libs/stripe-api'),
    libsRoot,
    schema
  );
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
