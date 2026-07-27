# ATW learning log

Use one entry per meaningful change.

## Entry template

### Date

YYYY-MM-DD

### Change

What did I implement or modify?

### Architecture concept

Which concept did the change demonstrate?

### Evidence

Commands, endpoint output, test result, diagram, or screenshot.

### Problem encountered

What failed or behaved unexpectedly?

### Resolution

How was it diagnosed and corrected?

### AWS connection

Which AWS service or cloud concept resembles this component?

---

## Suggested first entry

### Change

Created a Node.js HTTP server that aggregates five external REST APIs.

### Architecture concept

Layering, service boundaries, concurrent I/O, timeout handling, and partial failure.

### AWS connection

The server could later run on EC2, Elastic Beanstalk, ECS, Lambda, or App Runner. The correct choice will depend on the deployment model and course requirements.
