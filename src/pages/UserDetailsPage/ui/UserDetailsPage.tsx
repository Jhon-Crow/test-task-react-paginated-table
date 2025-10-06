import {useParams} from "react-router-dom";
import {Avatar, Box, Card, CardContent, Chip, Container, Skeleton, Typography, useTheme} from "@mui/material";
import {CalendarToday, Person} from '@mui/icons-material';
import {ErrorAlert} from "../../../shared/ErrorAlert/ui/ErrorAlert.tsx";
import {useGetUserByIdQuery} from "../../../app/redux/mockApi.ts";

export const UserDetailsPage = () => {
    const {id} = useParams();
    const {data: user, isLoading, error} = useGetUserByIdQuery(Number(id));
    const theme = useTheme();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) return (
        <Container
            maxWidth="md"
            sx={{
                marginTop: '.5rem',
                py: 8,
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
        >
            <Card
                sx={{
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Box
                    sx={{
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: 'white',
                        py: 6,
                        textAlign: 'center',
                        position: 'relative'
                    }}
                >
                    <Skeleton
                        variant="circular"
                        sx={{
                            width: 120,
                            height: 120,
                            mx: 'auto',
                            border: '4px solid white',
                            bgcolor: 'rgba(255,255,255,0.3)'
                        }}
                    />

                    <Skeleton
                        width="60%"
                        height={48}
                        sx={{
                            mt: 3,
                            mx: 'auto',
                            bgcolor: 'rgba(255,255,255,0.3)',
                            borderRadius: 2
                        }}
                    />

                    <Skeleton
                        width={100}
                        height={32}
                        sx={{
                            mt: 2,
                            mx: 'auto',
                            bgcolor: 'rgba(255,255,255,0.3)',
                            borderRadius: 16
                        }}
                    />
                </Box>
                <CardContent sx={{p: 6}}>
                    <Box sx={{mb: 5}}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 3,
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            📝 Profile Details
                        </Typography>

                        <Skeleton
                            height={24}
                            sx={{mb: 1, borderRadius: 1}}
                        />
                        <Skeleton
                            height={24}
                            sx={{mb: 1, borderRadius: 1}}
                        />
                        <Skeleton
                            height={24}
                            width="80%"
                            sx={{borderRadius: 1}}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 3,
                            borderRadius: 3,
                            background: theme.palette.grey[50],
                            border: `1px solid ${theme.palette.grey[200]}`
                        }}
                    >
                        <CalendarToday
                            sx={{
                                color: theme.palette.primary.main
                            }}
                        />
                        <Box sx={{flex: 1}}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    color: theme.palette.text.primary
                                }}
                            >
                                Member Since
                            </Typography>
                            <Skeleton
                                width={200}
                                height={20}
                                sx={{borderRadius: 1}}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 4,
                            pt: 3,
                            borderTop: `1px solid ${theme.palette.grey[200]}`
                        }}
                    >
                        <Skeleton
                            width={120}
                            height={32}
                            sx={{borderRadius: 16}}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
    if (error) { // @ts-expect-error Property 'status' & 'data' does not exist on type 'FetchBaseQueryError | SerializedError'
        return <ErrorAlert text={`${error.status} ${error.data}`}/>;
    }
    if (user) return (
        <Container
            maxWidth="md"
            sx={{
                marginTop: '.5rem',
                py: 8,
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
        >
            <Card
                sx={{
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Box
                    sx={{
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: 'white',
                        py: 6,
                        textAlign: 'center',
                        position: 'relative'
                    }}
                >
                    <Avatar
                        src={user.avatar}
                        sx={{
                            width: 120,
                            height: 120,
                            mx: 'auto',
                            border: '4px solid white',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                        }}
                        alt={user.name}
                    />
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            mt: 3,
                            fontWeight: 700,
                            fontSize: {xs: '2rem', md: '2.5rem'}
                        }}
                    >
                        {user.name}
                    </Typography>
                    <Chip
                        icon={<Person/>}
                        label={`ID: ${user.id}`}
                        sx={{
                            mt: 2,
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)'
                        }}
                    />
                </Box>
                <CardContent sx={{p: 6}}>
                    <Box sx={{mb: 5}}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 3,
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            📝 Profile Details
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                lineHeight: 1.8,
                                color: theme.palette.text.secondary,
                                fontSize: '1.1rem',
                                textAlign: 'justify'
                            }}
                        >
                            {user.details ? user.details : 'No details info'}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 3,
                            borderRadius: 3,
                            background: theme.palette.grey[50],
                            border: `1px solid ${theme.palette.grey[200]}`
                        }}
                    >
                        <CalendarToday
                            sx={{
                                color: theme.palette.primary.main
                            }}
                        />
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    color: theme.palette.text.primary
                                }}
                            >
                                Member Since
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary
                                }}
                            >
                                {formatDate(user.createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 4,
                            pt: 3,
                            borderTop: `1px solid ${theme.palette.grey[200]}`
                        }}
                    >
                        <Chip
                            label="Active Profile"
                            color="success"
                            variant="outlined"
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};