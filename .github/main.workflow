workflow "site" {
  on = "push"
  resolves = ["site:alias"]
}

action "site:publish" {
  uses = "actions/zeit-now@9fe84d5"
  secrets = ["ZEIT_TOKEN"]
  args = "--public --no-clipboard > $HOME/ZEIT.txt"
}

action "site:sha-alias" {
  uses = "actions/zeit-now@9fe84d5"
  args = "alias `cat $HOME/ZEIT.txt` $GITHUB_SHA"
  secrets = ["ZEIT_TOKEN"]
  needs = ["site:publish"]
}

action "site:master" {
  uses = "actions/bin/filter@b2bea07"
  needs = ["site:sha-alias"]
  args = "branch master"
}

action "site:alias" {
  uses = "actions/zeit-now@9fe84d5"
  args = "alias"
  secrets = ["ZEIT_TOKEN"]
  needs = ["site:master"]
}
