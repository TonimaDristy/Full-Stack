import ResourceCard from "./ResourceCard";

export default function ResourceGrid({
    resources,
    refresh,
}: {
    resources: any[];
    refresh: () => void;
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res) => (
                <ResourceCard key={res.id} resource={res} refresh={refresh} />
            ))}
        </div>
    );
}
