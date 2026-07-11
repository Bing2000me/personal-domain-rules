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
clash-party/nsfw-override.js   Recommended Clash Party override; inserts the group after 手动切换
clash-party/nsfw-override.yaml Simple YAML fallback; appends the group to the bottom
```

## Loon

Create a selectable policy group, for example:

```ini
[Proxy Group]
NSFW 手动切换 = select,DIRECT,手动切换,香港节点,日本节点,美国节点,台湾节点,狮城节点,韩国节点
```

Then add the shared rules URL as a remote rule and bind it to that policy:

```ini
[Remote Rule]
https://raw.githubusercontent.com/Bing2000me/personal-domain-rules/main/rules/nsfw.list,policy=NSFW 手动切换,tag=Personal NSFW,enabled=true
```

The policy and region-group names must exactly match the names in the active Loon configuration.

## Clash Party / Mihomo

### Recommended: JavaScript override

Import and apply:

```text
https://raw.githubusercontent.com/Bing2000me/personal-domain-rules/main/clash-party/nsfw-override.js
```

It creates an `NSFW 手动切换` select group with these choices:

```text
DIRECT
手动切换
香港节点
日本节点
美国节点
台湾节点
狮城节点
韩国节点
```

The script inserts the group immediately after the existing `手动切换` group. If that group is absent, it tries to insert after `节点选择`; otherwise it places the group at the beginning.

### YAML fallback

Import and apply:

```text
https://raw.githubusercontent.com/Bing2000me/personal-domain-rules/main/clash-party/nsfw-override.yaml
```

YAML array overrides can prepend or append items but cannot insert at an arbitrary middle position. This fallback therefore appends the NSFW group to the bottom of the proxy-group list.

The override files are only configuration glue for Clash Party. Loon and Clash Party still read the same shared rules URL above.
