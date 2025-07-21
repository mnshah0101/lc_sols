class Solution:
    def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
        m, n = len(matrix), len(matrix[0]) # dimensions 
        
        ans = -inf 
        rsum = [[0]*(n+1) for _ in range(m)] # row prefix sum 
        for j in range(n): 
            for i in range(m): rsum[i][j+1] = matrix[i][j] + rsum[i][j]
            for jj in range(j+1):
                prefix = 0 
                vals = [0]
                for i in range(m): 
                    prefix += rsum[i][j+1] - rsum[i][jj]
                    x = bisect_left(vals, prefix - k)
                    if x < len(vals): ans = max(ans, prefix - vals[x])
                    insort(vals, prefix)
        return ans