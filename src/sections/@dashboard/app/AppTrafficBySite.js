// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(8, 1fr)',
          }}
        >
          {list.map((site) => (
            <Paper key={site.name} variant="outlined" sx={{ py: 0, textAlign: 'center' }}>

              <Typography variant="h6" sx={{pt: 1}}>{site.value}</Typography>

              <Typography variant="body2" sx={{ pb: 1, color: 'text.secondary' }}>
                {site.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
