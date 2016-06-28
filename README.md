## Load Test Rethinkdb

Spawns fake displays.  Each display will open a channel to the real time feed and log any changes received.

### Set up
Create instance templates
Add bind "all" to horizon config
Allow unauthenticated horizon connections in horizon config
Set horizon schema

### Run

```
node spawn-displays.js
```
