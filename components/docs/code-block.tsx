"use client";

import { Highlight, themes } from "prism-react-renderer";

export function CodeBlock({
  code,
  language = "tsx",
}: {
  code: string;
  language?: string;
}) {
  return (
    <Highlight theme={themes.oneDark} code={code.trimEnd()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} max-h-96 overflow-auto rounded-lg border border-border p-4 text-[13px] leading-relaxed`}
          style={{ ...style }}
        >
          {tokens.map((line, lineIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: lines are positional
            <div key={lineIndex} {...getLineProps({ line })}>
              {line.map((token, tokenIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: tokens are positional
                <span key={tokenIndex} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
