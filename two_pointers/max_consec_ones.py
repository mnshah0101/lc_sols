class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        if len(nums) <= k:
            return len(nums)
        if len(nums) - sum(nums) <= k:
            return len(nums)
        max_len = 0
        left = 0
        c = nums[0]

        if k > 0:
            max_len = 1
        if nums[0] == 1:
            max_len = 1

        for right in range(1, len(nums)):
            c += nums[right]
            if right - left + 1 < max_len:
                continue
            if (right - left + 1) - c <= k:
                max_len = max(max_len, right - left + 1)
            while right - left + 1 - c > k:
                c -= nums[left]
                left += 1
        return max_len


             
