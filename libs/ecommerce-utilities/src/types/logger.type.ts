import { APPS_NAME } from '../enum';

export type LogOutput = {
  appName: APPS_NAME;
  message: any;
  context?: string;
};

export type FatalOutput = LogOutput;

export type ErrorOutput = LogOutput & {
  trace?: string;
};

export type WarnOutput = LogOutput;

export type DebugOutput = LogOutput;

export type VerboseOutput = LogOutput;
