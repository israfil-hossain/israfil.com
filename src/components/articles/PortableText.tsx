"use client"; 

import { PortableText } from '@portabletext/react';
import { CodeWindow } from '../CodeWindow';


export default function CustomPortableText ({ value }: any) {
  const components = {
    types: {
      // Handle code blocks
      code: ({ value }: any) => (
        <CodeWindow title={value.language}>
          <pre>{value.code}</pre>
        </CodeWindow>
      ),
      // You can handle other types like normal text here if needed
    },
  };

  return <PortableText value={value} components={components} />;
};
