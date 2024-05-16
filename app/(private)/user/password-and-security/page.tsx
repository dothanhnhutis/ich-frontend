import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, Link, LockIcon } from "lucide-react";
import React from "react";

const PasswordAndSecurityPage = () => {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        This email will be your login information
      </p>
      <div className="flex gap-4 flex-wrap">
        {/* <Button>
      <MailIcon className="size-4 mr-2" /> Change Email
    </Button> */}
        <Button asChild>
          <Link href="/account/settings/change-password">
            <LockIcon className="size-4 mr-2" />
            Change Password
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PasswordAndSecurityPage;
