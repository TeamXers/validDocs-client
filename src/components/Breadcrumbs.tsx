import { Breadcrumbs, BreadcrumbsProps, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export interface AppBreadcrumbsProps extends BreadcrumbsProps {
    links: {
        title: string,
        link?: string
    }[]
}

export const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = ({ links, ...props }) => {
    return <Breadcrumbs aria-label="breadcrumb" {...props}>
        {
            links.map(({ title, link }, i) => {
                const isLast = i >= links.length - 1;

                if (isLast) {
                    return <Typography key={i} color="text.primary">{title}</Typography>
                }

                if (!link) {
                    return <Typography key={i}>{title}</Typography>
                }

                return <Link underline="hover" color="inherit"
                    component={RouterLink} to={link} key={i}>
                    {title}
                </Link>
            })
        }
    </Breadcrumbs>

}
