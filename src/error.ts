import { writable } from "svelte/store";

export enum Failure {
  TransactionFailed = 1,
}

export const error = writable(null);

export class Unreachable extends Error {
  constructor(value?: never) {
    if (value) {
      super('unreachable value reached: ' + value);
    } else {
      super('unreachable code reached');
    }
  }
}

class AssertionError extends Error {
  constructor(message?: string) {
    if (message) {
      super(`assertion failed: ${message}`);
    } else {
      super(`assertion failed`);
    }
  }
}

export function assert(value: any, message?: string): asserts value {
  if (! value) {
    throw new AssertionError(message);
  }
}

export function assertEq(actual: any, expected: any, message?: string) {
  if (actual !== expected) {
    throw new AssertionError(`assertion failed: expected '${expected}', got '${actual}'`);
  }
}