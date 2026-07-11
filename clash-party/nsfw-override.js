function main(config) {
  const groupName = "NSFW 手动切换";
  const providerName = "personal-nsfw";
  const rule = "RULE-SET," + providerName + "," + groupName;

  config["rule-providers"] = config["rule-providers"] || {};
  config["rule-providers"][providerName] = {
    type: "http",
    behavior: "classical",
    format: "text",
    url: "https://raw.githubusercontent.com/Bing2000me/personal-domain-rules/main/rules/nsfw.list",
    path: "./ruleset/personal-nsfw.list",
    interval: 86400
  };

  const group = {
    name: groupName,
    type: "select",
    proxies: [
      "DIRECT",
      "手动切换",
      "香港节点",
      "日本节点",
      "美国节点",
      "台湾节点",
      "狮城节点",
      "韩国节点"
    ]
  };

  config["proxy-groups"] = Array.isArray(config["proxy-groups"])
    ? config["proxy-groups"]
    : [];

  // Avoid duplicates when the override is reapplied.
  config["proxy-groups"] = config["proxy-groups"].filter(function (item) {
    return !(item && item.name === groupName);
  });

  // Put the custom group immediately after the existing 手动切换 group.
  let insertIndex = config["proxy-groups"].findIndex(function (item) {
    return item && item.name === "手动切换";
  });

  // Fallback: place it after 节点选择, otherwise at the beginning.
  if (insertIndex < 0) {
    insertIndex = config["proxy-groups"].findIndex(function (item) {
      return item && item.name === "节点选择";
    });
  }

  if (insertIndex >= 0) {
    config["proxy-groups"].splice(insertIndex + 1, 0, group);
  } else {
    config["proxy-groups"].unshift(group);
  }

  config.rules = Array.isArray(config.rules) ? config.rules : [];
  config.rules = config.rules.filter(function (item) {
    return item !== rule;
  });
  config.rules.unshift(rule);

  return config;
}
