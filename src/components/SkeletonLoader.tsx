import React from 'react';
import { Box, Skeleton, Card, CardContent } from '@mui/material';

interface SkeletonLoaderProps {
  variant?: 'dashboard' | 'reservas' | 'card' | 'list';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  variant = 'card', 
  count = 3 
}) => {
  const renderDashboardSkeleton = () => (
    <Box className="space-y-6">
      {/* Header skeleton */}
      <Box className="flex justify-between items-center">
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width={120} height={36} className="rounded-lg" />
      </Box>

      {/* Stats cards skeleton */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-sm">
            <CardContent>
              <Box className="flex items-center justify-between">
                <Box>
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={40} height={32} />
                </Box>
                <Skeleton variant="circular" width={40} height={40} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Recent reservations skeleton */}
      <Card className="shadow-sm">
        <CardContent>
          <Skeleton variant="text" width={150} height={24} className="mb-4" />
          {[1, 2, 3].map((i) => (
            <Box key={i} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <Box className="flex items-center space-x-3">
                <Skeleton variant="rectangular" width={40} height={40} className="rounded" />
                <Box>
                  <Skeleton variant="text" width={120} height={20} />
                  <Skeleton variant="text" width={80} height={16} />
                </Box>
              </Box>
              <Skeleton variant="rectangular" width={80} height={24} className="rounded" />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );

  const renderReservasSkeleton = () => (
    <Box className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="shadow-sm">
          <CardContent>
            <Box className="flex items-center justify-between">
              <Box className="flex items-center space-x-4">
                <Skeleton variant="rectangular" width={60} height={60} className="rounded-lg" />
                <Box>
                  <Skeleton variant="text" width={100} height={20} />
                  <Skeleton variant="text" width={150} height={16} />
                  <Skeleton variant="text" width={120} height={16} />
                </Box>
              </Box>
              <Box className="flex space-x-2">
                <Skeleton variant="rectangular" width={80} height={32} className="rounded" />
                <Skeleton variant="rectangular" width={80} height={32} className="rounded" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderCardSkeleton = () => (
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="shadow-sm">
          <CardContent>
            <Skeleton variant="text" width="60%" height={24} className="mb-2" />
            <Skeleton variant="text" width="40%" height={20} className="mb-3" />
            <Skeleton variant="rectangular" width="100%" height={120} className="rounded mb-3" />
            <Box className="flex justify-between">
              <Skeleton variant="text" width="30%" height={20} />
              <Skeleton variant="text" width="20%" height={20} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderListSkeleton = () => (
    <Box className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
          <Skeleton variant="circular" width={40} height={40} />
          <Box className="flex-1">
            <Skeleton variant="text" width="70%" height={20} />
            <Skeleton variant="text" width="50%" height={16} />
          </Box>
          <Skeleton variant="rectangular" width={60} height={20} className="rounded" />
        </Box>
      ))}
    </Box>
  );

  switch (variant) {
    case 'dashboard':
      return renderDashboardSkeleton();
    case 'reservas':
      return renderReservasSkeleton();
    case 'list':
      return renderListSkeleton();
    default:
      return renderCardSkeleton();
  }
};

export default SkeletonLoader; 