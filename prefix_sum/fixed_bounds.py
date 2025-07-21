class Solution:
    def countSubarrays(self, nums: List[int], minK: int, maxK: int) -> int:
        total = 0
        last_min = -1
        last_max = -1
        last_bad = -1

        for i in range(len(nums)):
            num = nums[i]
            if num > maxK or num < minK:
                last_bad = i
            if num == maxK:
                last_max = i
            if num == minK:
                last_min = i
            cur_window_start = min(last_min, last_max)
            if last_min != -1 and last_max != -1:
                total += max(0, min(last_min, last_max) - last_bad)
        return total
        