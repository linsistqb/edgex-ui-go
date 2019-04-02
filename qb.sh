#!/bin/sh

#add all
git add .

#echo state 
#git status

#commit 
git commit -m $1

#name and passwd 
git push  origin master 
