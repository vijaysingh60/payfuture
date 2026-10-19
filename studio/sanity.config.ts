import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'payfuture',
  title: 'Payfuture',
  projectId: 'uqss3153',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('News posts').schemaType('post').child(S.documentTypeList('post').title('News posts')),
            S.listItem().title('Events').schemaType('event').child(S.documentTypeList('event').title('Events')),
            S.divider(),
            S.listItem().title('Categories').schemaType('category').child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
