#!/usr/bin/env bash

function update() {
  git checkout master -- hebdenplaces.csv hebdenplaces.json
  git commit -m 'Updating to latest version of dataset'
}

$*
