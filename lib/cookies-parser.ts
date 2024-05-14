interface Cookie {
  name: string;
  value: string;
  domain?: string | undefined;
  //   encode?(value: string): string;
  path?: string | undefined;
  partitioned?: boolean | undefined;
  expires?: Date | undefined;
  maxAge?: number | undefined;
  httpOnly?: boolean | undefined;
  sameSite?: true | false | "lax" | "strict" | "none" | undefined;
  priority?: "low" | "medium" | "high" | undefined;
  secure?: boolean | undefined;
}

export function parseCookie(cookieStr: string): Cookie {
  const parts = cookieStr.split("; ").map((part) => part.trim());
  const [name, value] = parts[0].split("=").map(decodeURIComponent);
  const cookieDict: Partial<Cookie> = { name, value };

  parts.slice(1).forEach((part) => {
    const [key, val] = part.split("=").map(decodeURIComponent);
    switch (key.toLowerCase()) {
      case "domain":
        cookieDict.domain = val;
        break;
      case "path":
        cookieDict.path = val;
        break;
      case "expires":
        cookieDict.expires = new Date(val);
        break;
      case "max-age":
        cookieDict.maxAge = parseInt(val);
        break;
      case "samesite":
        cookieDict.sameSite =
          val === "true" || val === "false"
            ? val === "true"
            : (val as Cookie["sameSite"]);
        break;
      case "priority":
        cookieDict.priority = val as Cookie["priority"];
        break;
      case "secure":
        cookieDict.secure = true;
        break;
      case "httponly":
        cookieDict.httpOnly = true;
        break;
      case "partitioned":
        cookieDict.partitioned = true;
        break;
    }
  });

  if (!cookieDict.name || !cookieDict.value) {
    throw new Error("Invalid cookie string");
  }

  return cookieDict as Cookie;
}
