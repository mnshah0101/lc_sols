class Solution:
    def waysToSplitArray(self, nums: List[int]) -> int:
        #prefix array
        total_sum = sum(nums)
        for i in range(1, len(nums)):
            nums[i] += nums[i-1]
        total = 0

        
        for num in nums[:-1]:
            if num >= total_sum - num:
                total += 1

        return total


        


