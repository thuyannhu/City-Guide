import { useState, useEffect } from 'react';
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client";
import Carousel from 'react-material-ui-carousel'
import { Breadcrumbs, ImageList, ImageListItem, Typography, Grid, Paper, Link } from '@mui/material';
import { GET_POI_BY_ID } from "@queries";
import { POIInput } from "@types";
import { mainTheme } from "@theme";
import PlaceIcon from '@mui/icons-material/Place';

const POIDetails = () => {
    const router = useRouter();
    const [POI, setPOI] = useState<POIInput>({
        name: "",
        address: "",
        description: "",
        images: [],
        city: "",
        category: "",
    });

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const { loading, error, data } = useQuery(GET_POI_BY_ID, {
        variables: { id: parseInt(router.query.id as string) },
    });

    useEffect(() => {
        if (!loading && data && data.getPoiById) {
            setPOI({
                name: data.getPoiById.name,
                address: data.getPoiById.address,
                description: data.getPoiById.description,
                images: data.getPoiById.images,
                city: data.getPoiById.city.name,
                category: data.getPoiById.category.name,
            });
        }
    }, [data, error, router.query.id]);

    function Item(props: any) {
        return (
            <Paper>
                <img src={props.item} alt={`Image ${props.index}`} style={{ width: '100%' }} />
            </Paper>
        )
    }

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        console.log(selectedImageIndex)
    };


    const handleCityClick = () => {
        router.push(`/city/search/${POI.city}`);
    };    

    const handleCategoryClick = () => {
        router.push(`/city/search/${POI.city}/category/${POI.category}`);
    };   
    const carouselImageStyle = {
        width: '100%', 
        height: '300px', 
        objectFit: 'cover', 
    };
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ marginTop: '1rem', marginLeft: '1rem' }}>
                <Link underline="hover" onClick={handleCityClick} sx={{ fontSize: mainTheme.typography.h6, fontWeight: "light" }} color={mainTheme.palette.primary.dark}>{POI.city}</Link>
                <Link underline="hover" onClick={handleCategoryClick}  sx={{ fontSize: mainTheme.typography.h6, fontWeight: "light" }} color={mainTheme.palette.primary.dark}>{POI.category}</Link>
                <Link underline="hover" sx={{ fontSize: mainTheme.typography.h6, fontWeight: "light" }} color={mainTheme.palette.primary.dark}>{POI.name}</Link>
            </Breadcrumbs>
            <Grid container spacing={6} sx={{ padding: '1rem' }}>
                <Grid item xs={6}>
                    <Carousel autoPlay={true} index={selectedImageIndex !== null ? selectedImageIndex : undefined} sx={{ height: '60vh' }}>
                        {POI.images.map((imageUrl, i) => (
                            <img
                                key={i}
                                src={imageUrl}
                                style={{ width: '100%', height: '55vh', objectFit: 'cover', borderRadius: '45px' }}
                            />
                        ))}
                    </Carousel>
                    <ImageList cols={5 }>
                        {POI.images.map((imageUrl, i) => (
                            <ImageListItem key={i} onClick={() => handleImageClick(i)}>
                                <img src={imageUrl} loading="lazy" style={{ borderRadius: '20px' }}/>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
                <Grid item xs sx={{ padding: '1rem' }}>
                    <Typography color={mainTheme.palette.primary.main} align="center" sx={{ fontSize: mainTheme.typography.h3, fontWeight: "bold" }}>{POI.name}</Typography>
                    <Typography align="justify" sx={{ fontSize: mainTheme.typography.h6, marginTop: '3rem' }}>{POI.description}</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '3rem' }}>
                        <PlaceIcon color="primary" />
                        <Typography sx={{ fontSize: mainTheme.typography.h6 }}>{POI.address}</Typography>
                    </div>
                    <Typography color={mainTheme.palette.primary.main} align="left" sx={{ fontSize: mainTheme.typography.h4, fontWeight: "bold", marginTop: '3rem' }}>NOTE</Typography>
                    <Typography color={mainTheme.palette.primary.main} align="left" sx={{ fontSize: mainTheme.typography.h4, fontWeight: "bold", marginTop: '3rem' }}>COMMENTAIRES</Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default POIDetails;
