#!/bin/bash
(cd "$(dirname "${BASH_SOURCE[0]}")" && npm install -g grunt-cli && npm install && npm test)
