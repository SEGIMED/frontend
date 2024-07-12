import IconRisk from "@/components/icons/iconRisk";

export default function RealColorRisk({ risk }) {
    if (!risk) {
        return <IconRisk color="gray" />;
    }

    switch (risk) {
        case "Bajo":
            return <IconRisk color="#70C247" />;
        case "Moderado":
            return <IconRisk color="#F5E400" />;
        case "Alto":
            return <IconRisk color="#E73F3F" />;
        default:
            return <IconRisk color="lightGray" />;
    }
}