class Solution:
    def findLengthOfShortestSubarray(self, arr: List[int]) -> int:
        left = 0
        nums = arr
        if len(arr) == 1:
            return 0
        while left < len(arr) - 1 and arr[left] <= arr[left+1]:
            left += 1
        right = len(arr) - 1
        while right > 0 and arr[right] >= arr[right-1]:
            right -= 1
    
        
        
                # after computing left and right
        ans = min(len(arr) - (left + 1), right)   # remove suffix or prefix

        i = 0
        j = right
        while i <= left and j < len(arr):
            if arr[i] <= arr[j]:
                ans = min(ans, j - i - 1)         # middle chunk to delete
                i += 1                            # try a longer prefix
            else:
                j += 1                            # need a larger suffix start
        return max(0,ans)