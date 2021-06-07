#!/bin/bash

set -xve

echo "Total Arguments:" $#
echo "All Arguments values:" $@

echo "First->"  $1
echo "Second->" $2

args=("$@")
echo "First->"  ${args[0]} 
echo "Second->" ${args[1]}