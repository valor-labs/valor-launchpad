export interface Seeder {
  seed(): Promise<unknown>;
  delete(): Promise<unknown>;
}
