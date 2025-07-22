class Solution:
    def visiblePoints(self, points: List[List[int]], angle: int, location: List[int]) -> int:
        same_location = 0
        angles = []
        
        for point in points:
            if point == location:
                same_location += 1
            else:
                # Use atan2 for correct quadrant, convert to degrees
                theta = math.atan2(point[1] - location[1], point[0] - location[0])
                angles.append(math.degrees(theta))
        
        angles.sort()
        angles += [a + 360 for a in angles]
        
        # Sliding window
        max_points = 0
        left = 0
        
        for right in range(len(angles)):
            while angles[right] - angles[left] > angle:
                left += 1
            max_points = max(max_points, right - left + 1)
        
        return max_points + same_location