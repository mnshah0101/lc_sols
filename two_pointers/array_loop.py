class Solution:
    def circularArrayLoop(self, nums: List[int]) -> bool:
        #just try to catch for every num
        def get_next(i, diff):
            return (i + diff) % len(nums)
        seen = set()
        for start in range(len(nums)):
            if start in seen:
                continue
            slow = start
            diff = nums[start]
            fast = get_next(slow, diff)
            while slow != fast:
                diff_slow = nums[slow]
                diff_fast = nums[fast]

                next_slow = get_next(slow, diff_slow)
                seen.add(next_slow)

                fast_next = get_next(fast, diff_fast)
                fast_next_diff = nums[fast_next]

                fast_next_next = get_next(fast_next, fast_next_diff)
                seen.add(fast_next_next)

                if nums[next_slow] * nums[slow] < 0:
                    break
                
                if nums[fast_next_next] * nums[fast] < 0:
                    break
                if nums[fast_next] * nums[fast] < 0:
                    break

                    
                slow = next_slow
                fast = fast_next_next

            if fast == slow:
                diff_slow = nums[slow]
                diff_fast = nums[fast]

                next_slow = get_next(slow, diff_slow)
                if next_slow != slow:
                    return True




        return False
