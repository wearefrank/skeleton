#!/bin/bash

if [[ -n $1 ]]; then
  echo "writeBuildInfo.sh - writing version $1"
  echo "instance.version=$1" > classes/BuildInfo.properties
  echo "versionDate_ddmmyyyy=$(date +%d/%m/%Y)" >> classes/BuildInfo.properties
  echo "configuration.version=$1" > configurations/%%CONFIGURATION_NAME%%/BuildInfo.properties
  echo "configuration.timestamp=$(date +%Y%m%d-%H%M%S)" >> configurations/%%CONFIGURATION_NAME%%/BuildInfo.properties
  export instance_version=$1
  export versionDate_yyyymmdd=$(date +%Y-%m-%d)
  envsubst < publiccode_template.yaml > publiccode.yaml
else
  echo "writeBuildInfo.sh - no version to write, leaving BuildInfo.properties unchanged"
fi
