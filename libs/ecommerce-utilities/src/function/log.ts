export function logStartApp(args: {
  appName: string;
  version: string;
  host: string;
  env: string;
  timeString: string;
  apiDocsUrl: string;
}) {
  console.info(
    'Server \x1b[34m%s\x1b[0m version \x1b[34m%s\x1b[0m running at \x1b[34m%s\x1b[0m in \x1b[31m%s\x1b[0m mode!',
    args.appName,
    args.version,
    args.host,
    args.env,
    args.timeString,
  );
  console.info(
    '\x1b[31mAPI Documents\x1b[0m is running at \x1b[34m%s\x1b[0m',
    args.apiDocsUrl,
  );
}
