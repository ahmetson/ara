import { setup as setupDemo } from './demo';
import { setup as setupAuth } from './auth';

export async function setup(): Promise<void> {
    await setupDemo();
    await setupAuth();
}


