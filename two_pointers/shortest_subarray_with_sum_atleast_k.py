class Solution:
    def shortestSubarray(self, nums: List[int], k: int) -> int:
        #we can do sliding window on prefix sum

        stack = deque()

        shortest = float('inf')

        curr_sum = 0
        for i, num in enumerate(nums):
            curr_sum += num
            if curr_sum >= k:
                shortest = min(shortest, i + 1)

            while stack and curr_sum - stack[0][0] >= k:
                v, x = stack.popleft()
                shortest = min(shortest, i - x)
            while stack and stack[-1][0] > curr_sum:
                stack.pop() 
            stack.append((curr_sum, i))



        return shortest if shortest != float('inf') else -1

        

        
            
            
