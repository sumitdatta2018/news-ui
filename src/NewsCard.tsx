import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { resolve } from 'path/win32';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { CardActionArea } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
export type NewsFeedCardProp = {
    unit: string
    keyword: string
    interval: string
};

export default function NewsFeedCard({ unit, keyword, interval }: NewsFeedCardProp) {
    var newsFeed: NewsFeed
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const initialState: NewsFeed = {
        data: [],
        meta: {}

    }
    const [newsFeedRes, setNewsFeed] = useState<NewsFeed>(initialState);
    useEffect(() => {
        console.log(keyword)
        const productRequestOptions = {
            method: 'GET',
            headers: { 'Accept': 'application/vnd.api+json' }
        };
        if (keyword != null && keyword) {
            fetch("http://localhost:8080/v1/news-feed?searchKeyword=" + keyword + "&groupingInterval=" + unit + "&groupingDuration=" + interval, productRequestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        console.log(newsFeed)
                        setNewsFeed(result);
                        newsFeed = result;
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }, [unit, keyword, interval])
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);

    };
    if (newsFeedRes != null) {
        return <div>
            {newsFeedRes?.data && newsFeedRes?.data.map((bucket, index) => {
                return (
                    <Stack spacing={1}>
                        <Divider>
                            <Typography variant="subtitle1">Bucket {index}</Typography>
                        </Divider>
                        <Grid container mt={1} pl={1} pr={1}
                            direction="row"
                            justifyContent="start"
                            alignItems="start"
                            columnSpacing={{ xs: 1, sm: 1, md: 1 }}>

                            {bucket.attributes?.articles && bucket.attributes?.articles.map((article, index) => {
                                return (
                                    <Grid item xs={3} mt={1}>
                                        <Card sx={{ maxWidth: 345, zIndex: 20000 }}>
                                            <CardActionArea href={article.url ?? ""}>
                                            <CardMedia
                                                component="img"
                                                image={article.urlToImage}
                                                alt="green iguana"
                                                object-fit="cover"
                                                height={300}
                                            />
                                            <CardContent style={{ maxHeight: 100, overflow: 'auto', minHeight: 100 }} >
                                                <Typography style={{ textAlign: 'start' }} gutterBottom variant="body1" component="div">
                                                    {article.title}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                    <ShareIcon />
                                                </IconButton>
                                                <ExpandMore
                                                    expand={expanded}
                                                    onClick={handleExpandClick}
                                                    aria-expanded={expanded}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </ExpandMore>
                                            </CardActions>
                                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography style={{ textAlign: 'start' }} paragraph>Content:</Typography>
                                                    <Typography style={{ textAlign: 'start' }} paragraph>
                                                        {article.content}
                                                    </Typography>
                                                    <Typography style={{ textAlign: 'start' }} paragraph>Description:</Typography>
                                                    <Typography style={{ textAlign: 'start' }}>
                                                        {article.description}
                                                    </Typography>
                                                    <Typography style={{ textAlign: 'start' }} paragraph>Publised At: {article.publishedAt}</Typography>
                                                </CardContent>
                                            </Collapse>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            }
                            )}
                        </Grid>
                    </Stack>

                )
            }


            )

            }
        </div>;
    }
    else {
        return null
    }
}

interface NewsFeed {
    data: Data[];
    meta?: Meta

}
interface Data {
    id: number;
    type?: string;
    attributes?: Attributes

}

interface Meta {

}
interface Attributes {
    articles: Article[]
}

interface Article {
    source?: Source;
    author?: string;
    title?: string;
    description?: string;
    url?: string;
    urlToImage?: string;
    publishedAt?: string;
    content?: string;

}

interface Source {
    id?: string;
    name?: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}