# Agent Hand-off Protocol

## Quick Start for Each Agent

1. **Read your agent's prompt file:**
   - Agent A: `AGENT_A_PROMPT.md`
   - Agent B: `AGENT_B_PROMPT.md`
   - Agent C: `AGENT_C_PROMPT.md`
   - Agent D: `AGENT_D_PROMPT.md`
   - Agent E: `AGENT_E_PROMPT.md`

2. **Read the main context:**
   - `AGENT_PROMPTS.md` - Overview of all agents
   - `README.md` - Project documentation
   - `LOGGING.md` - Logging system guide

3. **Verify current state:**
   ```bash
   npm test          # Should pass
   npm run dev       # Should start without errors
   ```

4. **Check what's been done:**
   - Look at your agent's status in `AGENT_PROMPTS.md`
   - Review related files mentioned in your prompt

## Communication Protocol

### Before Starting Work

1. **Announce your start:**
   ```
   "Agent X starting work on [feature]. Current status: [status from AGENT_PROMPTS.md]"
   ```

2. **Verify dependencies:**
   - Check that previous agents' work is complete
   - Run tests to ensure nothing is broken
   - Check for any TODO comments from previous agents

### During Work

1. **Use structured logging:**
   ```typescript
   import { log } from '@/lib/utils/logger';
   log.info('agent-x', 'Working on feature Y', { context: 'data' });
   ```

2. **Follow existing patterns:**
   - Check similar files for patterns
   - Use the same naming conventions
   - Follow the same error handling approach

3. **Leave TODO markers for complex areas:**
   ```typescript
   // TODO(Agent-X): Add feature Y when Z is ready
   // See: AGENT_X_PROMPT.md for context
   ```

### After Completing Work

1. **Run all tests:**
   ```bash
   npm test
   npm run test:e2e  # If applicable
   npm run lint
   ```

2. **Update documentation:**
   - Update your agent's status in `AGENT_PROMPTS.md`
   - Add any new patterns or conventions
   - Update README if needed

3. **Announce completion:**
   ```
   "Agent X completed [feature]. Status: ✅ COMPLETE. 
   Tests: [X/X passing]. 
   Next: Agent Y can proceed with [next feature]."
   ```

## Status Updates

When updating status, use this format in `AGENT_PROMPTS.md`:

```markdown
## Agent X: [Name]

**Status:** ✅ COMPLETE / 🔄 IN PROGRESS / ⏳ PENDING

**What was done:**
- Feature 1
- Feature 2

**TODO:**
- Remaining work
```

## Common Issues

### Tests Failing
- Check if previous agent's changes broke something
- Review test output for specific failures
- Check for missing dependencies

### Build Errors
- Run `npm install` to ensure dependencies are up to date
- Check TypeScript errors: `npx tsc --noEmit`
- Verify Next.js config is correct

### Logging Not Working
- Ensure `NODE_ENV=development`
- Check LogViewer component is mounted
- Verify logger imports

## Agent Dependencies

```
Agent A (Bootstrap)
  ↓
Agent B (TF + Camera)
  ↓
Agent C (Review + Data)
  ↓
Agent D (Poster + Polish)
  ↓
Agent E (Testing + CI)
```

**Current Status:**
- ✅ Agent A: Complete
- ✅ Agent B: Complete
- ✅ Agent C: Complete
- ✅ Agent D: Complete
- 🔄 Agent E: In Progress (E2E tests need verification)

## Quick Reference

### File Locations
- Core logic: `src/lib/`
- Components: `src/components/`
- Pages: `src/app/`
- Tests: `tests/`
- Config: Root directory

### Key Commands
```bash
npm run dev          # Start dev server
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests
npm run build        # Build for production
npm run lint         # Check linting
```

### Logging
```typescript
import { log } from '@/lib/utils/logger';
log.info('category', 'message', { data: 'value' });
```

### Testing
```typescript
// Unit test example
import { describe, it, expect } from 'vitest';
describe('feature', () => {
  it('should work', () => {
    expect(result).toBe(expected);
  });
});
```





