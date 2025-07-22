import copy
from typing import List

class Solution:
    def possibleToStamp(self, grid: List[List[int]], stampHeight: int, stampWidth: int) -> bool:
        pre = copy.deepcopy(grid)
        """
        How to approach > 2D array
        we can basically keep a sliding window, if we fit, we can turn everything negative - if we are negative then we know we are good

        """

        prefix = copy.deepcopy(grid)
        scan = copy.deepcopy(grid)

        for i in range(len(prefix)):
            for j in range(len(prefix[0])):
                top_left = grid[i][j]
                left_edge = 0 if j == 0 else prefix[i][j-1]
                top_edge = 0 if i == 0 else prefix[i-1][j]
                bottom = 0 if (i==0 or j ==0 ) else prefix[i-1][j-1]
                prefix[i][j] = top_edge + left_edge - bottom + top_left
        
        # Reset scan matrix to all zeros for stamp placement tracking
        for i in range(len(scan)):
            for j in range(len(scan[0])):
                scan[i][j] = 0
        
        # Try placing stamps at each valid position
        for i in range(len(grid) - stampHeight + 1):
            for j in range(len(grid[0]) - stampWidth + 1):
                # Check if we can place stamp at position (i, j)
                bottom_right_i = i + stampHeight - 1
                bottom_right_j = j + stampWidth - 1
                
                # Calculate sum in rectangle using prefix sum
                total = prefix[bottom_right_i][bottom_right_j]
                if i > 0:
                    total -= prefix[i-1][bottom_right_j]
                if j > 0:
                    total -= prefix[bottom_right_i][j-1]
                if i > 0 and j > 0:
                    total += prefix[i-1][j-1]
                
                # If sum is 0, we can place stamp here
                if total == 0:
                    # Mark stamp placement using difference array technique
                    scan[i][j] += 1
                    if bottom_right_i + 1 < len(scan):
                        scan[bottom_right_i + 1][j] -= 1
                    if bottom_right_j + 1 < len(scan[0]):
                        scan[i][bottom_right_j + 1] -= 1
                    if bottom_right_i + 1 < len(scan) and bottom_right_j + 1 < len(scan[0]):
                        scan[bottom_right_i + 1][bottom_right_j + 1] += 1
        
        # Convert scan matrix to actual coverage using prefix sum
        for i in range(len(scan)):
            for j in range(len(scan[0])):
                left_edge = 0 if j == 0 else scan[i][j-1]
                top_edge = 0 if i == 0 else scan[i-1][j]
                bottom = 0 if (i==0 or j ==0 ) else scan[i-1][j-1]
                scan[i][j] = top_edge + left_edge - bottom + scan[i][j]
        
        # Check if all empty cells are covered
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == 0 and scan[i][j] == 0:
                    return False
        
        return True