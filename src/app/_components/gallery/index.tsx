import Image from 'next/image';

import { Grid } from '@mui/material';
import { GalleryProps } from './types';
import { PhotosTypes } from '@/app/_services/types';

export default function Gallery({data}:GalleryProps) { 

    if(!data||data.length===0){
        return(
            <Grid spacing={2} justifyContent="center" alignItems="center" item container>
                <Grid item key={'Message'}>
                    <div data-testid="message" style={{margin:"8px"}}>
                        No photos available
                    </div>
                </Grid>
            </Grid>
          )
    } else {
        return (
            <Grid spacing={2} justifyContent="center" alignItems="center" item container>
                {data && (
                    data.map( (photo:PhotosTypes) => 
                    <Grid item key={photo.id}>
                        <Image
                            priority={true}
                            data-testid={"image"}
                            src={photo.img_src}
                            alt={`Photo id: ${photo.id}`}
                            width={250}
                            height={250}
                        />
                    </Grid>
                    )
                )} 
            </Grid>
        );
    } 
  }