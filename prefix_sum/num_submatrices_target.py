class Solution:
    def numSubmatrixSumTarget(self, matrix: List[List[int]], target: int) -> int:
        rows, cols = len(matrix), len(matrix[0])
        for r in range(rows):
            for c in range(cols):
                if r > 0:
                    matrix[r][c] += matrix[r-1][c]
                if c > 0:
                    matrix[r][c] += matrix[r][c-1]
                if r > 0 and c > 0:
                    matrix[r][c] -= matrix[r-1][c-1]

        total = 0
        for r1 in range(len(matrix)):
            for r2 in range(r1, len(matrix)):
                count = {}
                count[0] = 1
                for c in range(len(matrix[0])):
                    val = matrix[r2][c] - (matrix[r1-1][c] if r1 > 0 else 0)
                    looking_for = val - target
                    total += count.get(looking_for, 0)
                    if val in count:
                        count[val] += 1
                    else:
                        count[val] = 1
        return total

