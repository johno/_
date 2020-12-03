#!/bin/bash

echo "Name of post"

read NAME

SLUG=$(echo "$NAME" | sed 's/ /-/g' | tr '[:upper:]' '[:lower:]' | tr -cd '[:alnum:]_-')
DATE=$(date '+%Y-%m-%d')

FRONTMATTER=$(cat <<-END
---
title: $NAME
slug: /$SLUG
date: $DATE
---
END)

echo "$FRONTMATTER" > src/posts/$SLUG.mdx
