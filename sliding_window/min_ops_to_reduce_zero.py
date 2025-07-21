class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
   
        total = sum(nums)
        target = total - x
        if target < 0:
            return -1
        left = 0
        curr = 0
        min_ops = float('inf')
        for right in range(len(nums)):
            curr += nums[right]
            while curr > target:
                curr -= nums[left]
                left += 1
            if curr == target:
                    min_ops = min(min_ops, len(nums) - (right - left + 1))

        return -1 if min_ops == float('inf') else min_ops
