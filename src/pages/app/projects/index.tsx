import { ProjectCard, AppLayout, Loader } from "@/components";
import { Card } from "@/components/ui/Card";
import { useUserProjects } from "@/hooks/useUserProjects";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoading, data } = useUserProjects();

  return (
    <AppLayout openSidebarItem="projects" pageTitle="Your Projects">
      {isLoading || data === undefined ? (
        <Loader />
      ) : (
        <div className="flex flex-row flex-wrap">
          <Card
            title="New Project"
            variant="primary"
            onClick={() => {
              router.push("/app/projects/new");
            }}
          />
          {data?.map((project) => (
            <ProjectCard
            key={project.id}
              project={project}
              onClick={() => {
                router.push(`/app/projects/${project.id}`);
              }}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
