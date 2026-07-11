# Personal Domain Rules

A small personal routing ruleset shared by **Loon** and **Mihomo / Clash Party**.

The shared rules file contains only domain matchers. Each app decides locally which proxy group or node should handle the matched sites.

## Shared rules URL

```text
https://raw.githubusercontent.com/Bing2000me/personal-domain-rules/main/rules/nsfw.list
```

## Files

```text
rules/nsfw.list                 Shared domain rules for Loon and Mihomo
clash-party/nsfw-override.yaml Optional Clash Party YAML override
```

## Loon

Create a selectable policy group, for example:

```ini
[Proxy Group]
NSFW 手动切换 = select,手动切换,DIRECT
```

Then add the shared rules URL as a remote rule and bind it to that policy:

```ini
[Remote Rule]
https://raw.githubusercontent.com/Bing2000me/personal-domain-rules/main/rules/nsfw.list,policy=NSFW 手动切换,tag=Personal NSFW,enabled=true
```

You may replace `手动切换` with existing region groups or individual nodes in your own Loon configuration.

## Clash Party / Mihomo

Apply `clash-party/nsfw-override.yaml` as a YAML override for the subscription you use. It creates an `NSFW 手动切换` select group and routes this ruleset into that group.

The override file is only configuration glue for Clash Party. Both Loon and Clash Party still read the same shared rules URL above.
