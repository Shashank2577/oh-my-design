import { jules } from '@google/jules-sdk';
import fs from 'fs';

const plan = JSON.parse(fs.readFileSync('.jules-plan-batch-2.json', 'utf8'));

async function run() {
  for (const batch of plan.batches) {
    console.log(`\n🚀 Batch ${batch.batch}: ${batch.name}`);

    const sessions = await jules.all(
      batch.tasks,
      (task) => ({
        prompt: task.prompt,
        source: { github: plan.repo, baseBranch: plan.branch },
        title: task.title,
        automationMode: 'AUTO_CREATE_PR',
      }),
      { concurrency: 5, stopOnError: false, delayMs: 1000 }
    );

    console.log(`Waiting for Batch ${batch.batch} to complete...`);
    const results = await Promise.all(sessions.map(s => s.result()));
    results.forEach((r, i) => {
      console.log(`  ${r.state === 'COMPLETED' ? '✅' : '❌'} ${batch.tasks[i].title}: ${r.pullRequest?.url || r.state}`);
    });
  }
}

run().catch(console.error);