import { AppLayout } from "@/components/AppLayout";
import { ProjectForm } from "@/components/ProjectForm";
import { Button, Text } from "@/components/ui";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { useUser } from "@/hooks/useUser";
import { Database } from "@/util/schema";
import { supabaseAtom } from "@/util/supabase";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

type projectDetails = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "description" | "name" | "public"
>;

export default function NewProject() {
  const [supabase] = useAtom(supabaseAtom);
  const {
    userDetails: { userData },
    userProjects: { refetch },
  } = useUser();
  const [project, setProject] = useState<
    projectDetails & { description: string }
  >({
    name: "",
    description: "",
    public: false,
  });

  return (
    <AppLayout
      openSidebarItem="projects"
      pageTitle="New Project"
      subtitle="Tell me all about it!">
      <ProjectForm
        onSubmit={async (project) => {
          if (userData) {
            try {
              const { error, status } = await supabase.from("projects").insert({
                ...project,
                user_id: userData.id,
              });

              if (status === 201) {
                const { data } = await refetch();
                return { redirect: `/app/projects/${data![0].id}` };
              }

              return {
                error: new Error(
                  error
                    ? `${error.message}\n${error.hint}`
                    : "Project not created"
                ),
              };
            } catch (error) {
              return { error: error as Error };
            }
          }
          return { error: new Error("User not found") };
        }}
      />
    </AppLayout>
  );
}
