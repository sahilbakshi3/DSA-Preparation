export const TEMPLATES = [
  {
    id: "two-pointers",
    label: "Two Pointers",
    color: "#3B8BD4",
    variants: [
      {
        name: "Converging (pair sum)",
        code: `// Two pointers converging from both ends — sorted array
vector<int> twoPointers(vector<int>& arr, int target) {
    int l = 0, r = (int)arr.size() - 1;

    while (l < r) {
        int sum = arr[l] + arr[r];

        if (sum == target) {
            return {l, r};           // found
        } else if (sum < target) {
            l++;                     // need bigger -> move left up
        } else {
            r--;                     // need smaller -> move right down
        }
    }

    return {-1, -1};                 // not found
}`,
      },
      {
        name: "Same direction (remove duplicates)",
        code: `// Slow/fast same-direction — remove duplicates in-place
int removeDuplicates(vector<int>& arr) {
    if (arr.empty()) return 0;
    int slow = 0;

    for (int fast = 1; fast < (int)arr.size(); fast++) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];   // write unique at slow
        }
        // fast always advances
    }

    return slow + 1;                 // new length
}`,
      },
    ],
  },
  {
    id: "sliding-window",
    label: "Sliding Window",
    color: "#1D9E75",
    variants: [
      {
        name: "Variable window (longest valid)",
        code: `// Variable sliding window — longest substring without repeating
int slidingWindow(const string& s) {
    unordered_map<char, int> freq;
    int l = 0, res = 0;

    for (int r = 0; r < (int)s.size(); r++) {
        // EXPAND: add s[r] to window
        freq[s[r]]++;

        // SHRINK: while window is invalid (duplicate found)
        while (freq[s[r]] > 1) {
            freq[s[l]]--;
            if (freq[s[l]] == 0) freq.erase(s[l]);
            l++;
        }

        // window [l..r] is valid -> update result
        res = max(res, r - l + 1);
    }

    return res;
}`,
      },
      {
        name: "Fixed window (size k)",
        code: `// Fixed window of size k — max sum subarray
int fixedWindow(const vector<int>& arr, int k) {
    int windowSum = 0, maxSum = 0;

    // build first window
    for (int i = 0; i < k; i++) windowSum += arr[i];
    maxSum = windowSum;

    // slide forward
    for (int r = k; r < (int)arr.size(); r++) {
        windowSum += arr[r];          // add new right
        windowSum -= arr[r - k];      // remove old left
        maxSum = max(maxSum, windowSum);
    }

    return maxSum;
}`,
      },
    ],
  },
  {
    id: "binary-search",
    label: "Binary Search",
    color: "#BA7517",
    variants: [
      {
        name: "Classic (exact match)",
        code: `// Classic binary search — find target in sorted array
int binarySearch(const vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;

    while (lo <= hi) {               // NOTE: lo <= hi for exact match
        int mid = lo + (hi - lo) / 2; // avoids overflow

        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }

    return -1;                       // not found
}`,
      },
      {
        name: "Left boundary (first true)",
        code: `// Find LEFTMOST position where condition is true
// e.g. first index where arr[i] >= target
int leftBound(const vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size(); // hi = n (exclusive)

    while (lo < hi) {                // NOTE: lo < hi
        int mid = lo + (hi - lo) / 2;

        if (arr[mid] < target) lo = mid + 1;
        else hi = mid;               // keep mid as candidate
    }

    return lo;                       // lo == hi == answer
}`,
      },
      {
        name: "Binary search on answer",
        code: `// "Min days to ship packages", "Koko eating bananas"
// Pattern: find minimum X such that feasible(X) == true
bool feasible(const vector<int>& nums, int capacity, int threshold) {
    int days = 1, cur = 0;
    for (int w : nums) {
        if (cur + w > capacity) { days++; cur = 0; }
        cur += w;
    }
    return days <= threshold;
}

int bsOnAnswer(vector<int>& nums, int threshold) {
    int lo = *max_element(nums.begin(), nums.end()); // min possible
    int hi = accumulate(nums.begin(), nums.end(), 0); // max possible

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;

        if (feasible(nums, mid, threshold)) {
            hi = mid;                // try smaller
        } else {
            lo = mid + 1;            // need bigger
        }
    }

    return lo;
}`,
      },
    ],
  },
  {
    id: "sorting",
    label: "Sorting",
    color: "#FF6B8B",
    variants: [
      {
        name: "Default ascending",
        code: `// Default sort (ascending)
void sortAscending(vector<int>& nums) {
    sort(nums.begin(), nums.end());
}`,
      },
      {
        name: "Custom comparator (pairs)",
        code: `// Sort pairs by first ascending, second descending
void sortPairs(vector<pair<int,int>>& arr) {
    sort(arr.begin(), arr.end(), [](const auto& a, const auto& b) {
        if (a.first != b.first) return a.first < b.first;
        return a.second > b.second;
    });
}`,
      },
      {
        name: "Stable sort",
        code: `// Keep relative order of equal keys
struct Student {
    string name;
    int score;
};

void sortByScoreStable(vector<Student>& students) {
    stable_sort(students.begin(), students.end(),
        [](const Student& a, const Student& b) {
            return a.score < b.score;
        });
}`,
      },
    ],
  },
  {
    id: "dfs",
    label: "DFS",
    color: "#9F77DD",
    variants: [
      {
        name: "Graph DFS (iterative)",
        code: `// Graph DFS iterative using explicit stack
void dfs(const vector<vector<int>>& graph, int start) {
    int n = graph.size();
    vector<bool> visited(n, false);
    stack<int> st;
    st.push(start);

    while (!st.empty()) {
        int node = st.top(); st.pop();
        if (visited[node]) continue;
        visited[node] = true;

        // process node here
        cout << node << "\\n";

        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                st.push(neighbor);
            }
        }
    }
}`,
      },
      {
        name: "Graph DFS (recursive)",
        code: `// Graph DFS recursive
void dfs(const vector<vector<int>>& graph, int node,
         vector<bool>& visited) {
    visited[node] = true;

    // process node here
    cout << node << "\\n";

    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}

// Call:
// vector<bool> visited(n, false);
// dfs(graph, startNode, visited);`,
      },
      {
        name: "Grid DFS (flood fill / islands)",
        code: `// Grid DFS — number of islands
const vector<pair<int,int>> DIRS = {{1,0},{-1,0},{0,1},{0,-1}};

void dfsGrid(vector<vector<char>>& grid, int r, int c) {
    int rows = grid.size(), cols = grid[0].size();

    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (grid[r][c] != '1') return;   // not land / visited

    grid[r][c] = '0';                // mark visited (mutate grid)

    for (auto& [dr, dc] : DIRS) {
        dfsGrid(grid, r + dr, c + dc);
    }
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int r = 0; r < (int)grid.size(); r++)
        for (int c = 0; c < (int)grid[0].size(); c++)
            if (grid[r][c] == '1') { dfsGrid(grid, r, c); count++; }
    return count;
}`,
      },
      {
        name: "Topological sort (DFS)",
        code: `// Topological sort via DFS post-order
// 0 = unvisited, 1 = in-stack (cycle!), 2 = done
bool dfs(int node, vector<vector<int>>& graph,
         vector<int>& state, vector<int>& order) {
    if (state[node] == 1) return false; // cycle
    if (state[node] == 2) return true;  // already processed

    state[node] = 1;                    // mark in-stack
    for (int nei : graph[node])
        if (!dfs(nei, graph, state, order)) return false;

    state[node] = 2;                    // mark done
    order.push_back(node);              // post-order
    return true;
}

vector<int> topoSort(int n, vector<vector<int>>& prereqs) {
    vector<vector<int>> graph(n);
    for (auto& e : prereqs) graph[e[1]].push_back(e[0]);

    vector<int> state(n, 0), order;

    for (int i = 0; i < n; i++)
        if (!dfs(i, graph, state, order)) return {}; // cycle

    reverse(order.begin(), order.end());
    return order;
}`,
      },
    ],
  },
  {
    id: "bfs",
    label: "BFS",
    color: "#378ADD",
    variants: [
      {
        name: "Graph BFS (shortest path)",
        code: `// Graph BFS — unweighted shortest path
int bfs(const vector<vector<int>>& graph, int start, int end) {
    int n = graph.size();
    vector<bool> visited(n, false);
    queue<pair<int,int>> q; // {node, distance}
    visited[start] = true;
    q.push({start, 0});

    while (!q.empty()) {
        auto [node, dist] = q.front(); q.pop();

        if (node == end) return dist;  // shortest path found

        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push({neighbor, dist + 1});
            }
        }
    }

    return -1;                         // unreachable
}`,
      },
      {
        name: "Grid BFS (min steps)",
        code: `// Grid BFS — minimum steps to reach goal
const vector<pair<int,int>> DIRS = {{1,0},{-1,0},{0,1},{0,-1}};

int bfsGrid(vector<vector<int>>& grid, int sr, int sc) {
    int rows = grid.size(), cols = grid[0].size();
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    visited[sr][sc] = true;
    queue<tuple<int,int,int>> q; // {r, c, steps}
    q.push({sr, sc, 0});

    while (!q.empty()) {
        auto [r, c, steps] = q.front(); q.pop();

        if (isGoal(r, c)) return steps;

        for (auto& [dr, dc] : DIRS) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && !visited[nr][nc] && grid[nr][nc] != -1) {
                visited[nr][nc] = true;
                q.push({nr, nc, steps + 1});
            }
        }
    }

    return -1;
}`,
      },
      {
        name: "Multi-source BFS",
        code: `// Multi-source BFS — enqueue ALL sources first
// e.g. "Walls and Gates", "Rotting Oranges"
void multiSourceBfs(vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    queue<pair<int,int>> q;
    const vector<pair<int,int>> DIRS = {{1,0},{-1,0},{0,1},{0,-1}};

    // Enqueue ALL sources at once
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (grid[r][c] == 0) q.push({r, c}); // 0 = gate/source

    while (!q.empty()) {
        auto [r, c] = q.front(); q.pop();

        for (auto& [dr, dc] : DIRS) {
            int nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && grid[nr][nc] == INT_MAX) {
                grid[nr][nc] = grid[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }
}`,
      },
      {
        name: "Kahn's (BFS topological sort)",
        code: `// Kahn's Algorithm — BFS-based topological sort
vector<int> kahns(int n, vector<vector<int>>& prereqs) {
    vector<vector<int>> graph(n);
    vector<int> indegree(n, 0);

    for (auto& e : prereqs) {
        graph[e[1]].push_back(e[0]);
        indegree[e[0]]++;
    }

    // Start with all nodes with no dependencies
    queue<int> q;
    for (int i = 0; i < n; i++)
        if (indegree[i] == 0) q.push(i);

    vector<int> order;

    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);

        for (int nei : graph[node]) {
            if (--indegree[nei] == 0) // all deps done
                q.push(nei);
        }
    }

    return (int)order.size() == n ? order : {}; // {} = cycle
}`,
      },
    ],
  },
  {
    id: "dp",
    label: "Dynamic Programming",
    color: "#D4537E",
    variants: [
      {
        name: "1D DP base template",
        code: `// 1D DP — dp[i] = optimal value for first i elements
int dp1D(const vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n + 1, 0);

    // Base cases
    dp[0] = 0;
    dp[1] = nums[0];

    for (int i = 2; i <= n; i++) {
        // TRANSITION: dp[i] = f(dp[i-1], dp[i-2], nums[i-1])
        dp[i] = max(
            dp[i - 1],               // skip current element
            dp[i - 2] + nums[i - 1]  // take current (skip adjacent)
        );
    }

    return dp[n];
}

// Space optimized (only need prev two):
int dp1DOptimized(const vector<int>& nums) {
    int prev2 = 0, prev1 = nums[0];

    for (int i = 1; i < (int)nums.size(); i++) {
        int curr = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}`,
      },
      {
        name: "2D DP base template (two sequences)",
        code: `// 2D DP — dp[i][j] = optimal for s1[0..i-1] and s2[0..j-1]
// Classic: LCS, Edit Distance, Interleaving String
int dp2D(const string& s1, const string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    // Fill base cases if needed beyond 0:
    // for (int i = 0; i <= m; i++) dp[i][0] = i; // edit distance

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;     // chars match (LCS)
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                // edit dist: 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]})
            }
        }
    }

    return dp[m][n];
}`,
      },
      {
        name: "0/1 Knapsack template",
        code: `// 0/1 Knapsack — each item used at most once
int knapsack01(const vector<int>& weights,
               const vector<int>& values, int capacity) {
    vector<int> dp(capacity + 1, 0);

    for (int i = 0; i < (int)weights.size(); i++) {
        // CRITICAL: iterate BACKWARDS to prevent item reuse
        for (int w = capacity; w >= weights[i]; w--) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    return dp[capacity];
}

// Unbounded Knapsack (coin change — items reusable):
int coinChange(const vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;

    for (int coin : coins) {
        // CRITICAL: iterate FORWARDS — reuse allowed
        for (int w = coin; w <= amount; w++) {
            if (dp[w - coin] != INT_MAX)
                dp[w] = min(dp[w], dp[w - coin] + 1);
        }
    }

    return dp[amount] == INT_MAX ? -1 : dp[amount];
}`,
      },
      {
        name: "Memoization (top-down) template",
        code: `// Top-down DP with memoization — House Robber example
unordered_map<int, int> memo;

int dp(const vector<int>& nums, int i) {
    if (i >= (int)nums.size()) return 0; // base case

    if (memo.count(i)) return memo[i];   // cache hit

    int result = max(
        dp(nums, i + 1),             // skip current
        nums[i] + dp(nums, i + 2)    // take current (skip next)
    );

    return memo[i] = result;
}

int solve(const vector<int>& nums) {
    memo.clear();
    return dp(nums, 0);
}`,
      },
    ],
  },
  {
    id: "backtracking",
    label: "Backtracking",
    color: "#EF9F27",
    variants: [
      {
        name: "Subsets (power set)",
        code: `// Generate all 2^n subsets
void backtrack(const vector<int>& nums, int start,
               vector<int>& curr, vector<vector<int>>& result) {
    result.push_back(curr);          // add at EVERY node (not just leaf)

    for (int i = start; i < (int)nums.size(); i++) {
        curr.push_back(nums[i]);     // choose
        backtrack(nums, i + 1, curr, result);
        curr.pop_back();             // UNCHOOSE <- the "back" in backtracking
    }
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> curr;
    backtrack(nums, 0, curr, result);
    return result;
}

// With duplicates (Subsets II):
vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    sort(nums.begin(), nums.end());  // SORT FIRST
    vector<vector<int>> result;
    vector<int> curr;

    function<void(int)> bt = [&](int start) {
        result.push_back(curr);
        for (int i = start; i < (int)nums.size(); i++) {
            if (i > start && nums[i] == nums[i-1]) continue; // skip dupes
            curr.push_back(nums[i]);
            bt(i + 1);
            curr.pop_back();
        }
    };

    bt(0);
    return result;
}`,
      },
      {
        name: "Permutations",
        code: `// Generate all n! permutations
void backtrack(const vector<int>& nums, vector<bool>& used,
               vector<int>& curr, vector<vector<int>>& result) {
    if ((int)curr.size() == (int)nums.size()) {
        result.push_back(curr);      // leaf node -> full permutation
        return;
    }

    for (int i = 0; i < (int)nums.size(); i++) {
        if (used[i]) continue;       // already in current path

        used[i] = true;
        curr.push_back(nums[i]);
        backtrack(nums, used, curr, result);
        curr.pop_back();
        used[i] = false;             // UNMARK <- critical
    }
}

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    vector<bool> used(nums.size(), false);
    vector<int> curr;
    backtrack(nums, used, curr, result);
    return result;
}

// With duplicates (Permutations II):
vector<vector<int>> permuteUnique(vector<int>& nums) {
    sort(nums.begin(), nums.end()); // SORT FIRST
    vector<vector<int>> result;
    vector<bool> used(nums.size(), false);
    vector<int> curr;

    function<void()> bt = [&]() {
        if ((int)curr.size() == (int)nums.size()) {
            result.push_back(curr); return;
        }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] == nums[i-1] && !used[i-1]) continue;
            used[i] = true;
            curr.push_back(nums[i]);
            bt();
            curr.pop_back();
            used[i] = false;
        }
    };

    bt();
    return result;
}`,
      },
      {
        name: "Combination Sum",
        code: `// Combination Sum I: reuse allowed
void backtrack(const vector<int>& cands, int start,
               int rem, vector<int>& curr,
               vector<vector<int>>& result) {
    if (rem == 0) { result.push_back(curr); return; }
    if (rem < 0) return;             // pruning

    for (int i = start; i < (int)cands.size(); i++) {
        curr.push_back(cands[i]);
        backtrack(cands, i, rem - cands[i], curr, result); // i = reuse ok
        curr.pop_back();
    }
}

vector<vector<int>> combinationSum(vector<int>& cands, int target) {
    vector<vector<int>> result;
    vector<int> curr;
    backtrack(cands, 0, target, curr, result);
    return result;
}

// Combination Sum II: NO reuse, has duplicates
vector<vector<int>> combinationSum2(vector<int>& cands, int target) {
    sort(cands.begin(), cands.end()); // SORT for dedup
    vector<vector<int>> result;
    vector<int> curr;

    function<void(int, int)> bt = [&](int start, int rem) {
        if (rem == 0) { result.push_back(curr); return; }
        for (int i = start; i < (int)cands.size(); i++) {
            if (cands[i] > rem) break;           // pruning
            if (i > start && cands[i] == cands[i-1]) continue; // dedup
            curr.push_back(cands[i]);
            bt(i + 1, rem - cands[i]);            // i+1 = no reuse
            curr.pop_back();
        }
    };

    bt(0, target);
    return result;
}`,
      },
      {
        name: "N-Queens",
        code: `// Place N queens on N x N board so none attack each other
class Solution {
    vector<vector<string>> result;
    unordered_set<int> cols, diag1, diag2; // diag1=r-c, diag2=r+c

    void backtrack(int row, int n, vector<string>& board) {
        if (row == n) { result.push_back(board); return; }

        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row - col)
                || diag2.count(row + col))
                continue;            // attacked by another queen

            // Place queen
            cols.insert(col);
            diag1.insert(row - col);
            diag2.insert(row + col);
            board[row][col] = 'Q';

            backtrack(row + 1, n, board);

            // Remove queen (BACKTRACK)
            cols.erase(col);
            diag1.erase(row - col);
            diag2.erase(row + col);
            board[row][col] = '.';
        }
    }

public:
    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));
        backtrack(0, n, board);
        return result;
    }
};`,
      },
    ],
  },
  {
    id: "union-find",
    label: "Union Find (DSU)",
    color: "#9F77DD",
    variants: [
      {
        name: "Full DSU implementation",
        code: `// Union-Find with path compression + union by rank
class UnionFind {
    vector<int> parent, rank_;
public:
    int components;

    UnionFind(int n) : parent(n), rank_(n, 0), components(n) {
        iota(parent.begin(), parent.end(), 0); // parent[i] = i
    }

    int find(int x) {
        // Path compression: flatten tree on the way up
        if (parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }

    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;  // already connected -> cycle!

        // Union by rank: attach shorter tree under taller
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;

        components--;
        return true;
    }

    bool connected(int x, int y) { return find(x) == find(y); }
};

// Usage:
// UnionFind uf(n);
// for (auto& [a, b] : edges) {
//     if (!uf.unite(a, b)) {
//         // edge creates a cycle -> redundant connection
//     }
// }
// cout << uf.components; // number of connected components`,
      },
    ],
  },
  {
    id: "heap",
    label: "Heap / Priority Queue",
    color: "#639922",
    variants: [
      {
        name: "Min-heap / Max-heap (STL)",
        code: `#include <queue>
using namespace std;

// Max-heap (default):
priority_queue<int> maxHeap;

// Min-heap:
priority_queue<int, vector<int>, greater<int>> minHeap;

// Min-heap with pairs (e.g. Dijkstra: {dist, node}):
priority_queue<pair<int,int>,
               vector<pair<int,int>>,
               greater<pair<int,int>>> pq;

// Kth Largest = Min-heap of size K:
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minH;

    for (int n : nums) {
        minH.push(n);
        if ((int)minH.size() > k)
            minH.pop();              // evict smallest
    }

    return minH.top();               // top = Kth largest
}

// Top K frequent elements:
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int,int> freq;
    for (int n : nums) freq[n]++;

    // min-heap of {frequency, value}
    priority_queue<pair<int,int>,
                   vector<pair<int,int>>,
                   greater<>> minH;
    for (auto& [val, cnt] : freq) {
        minH.push({cnt, val});
        if ((int)minH.size() > k) minH.pop();
    }

    vector<int> res;
    while (!minH.empty()) { res.push_back(minH.top().second); minH.pop(); }
    return res;
}`,
      },
    ],
  },
  {
    id: "prefix-sum",
    label: "Prefix Sum",
    color: "#9F77DD",
    variants: [
      {
        name: "1D prefix sum + subarray sum = k",
        code: `// 1D Prefix Sum — O(n) build, O(1) range query
vector<int> buildPrefix(const vector<int>& nums) {
    int n = nums.size();
    vector<int> prefix(n + 1, 0);
    for (int i = 0; i < n; i++)
        prefix[i + 1] = prefix[i] + nums[i];
    // Range sum [l, r] = prefix[r+1] - prefix[l]
    return prefix;
}

// Count subarrays with sum = k (works with negatives too!)
int subarraySum(const vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1;              // empty prefix sum 0 seen once
    int count = 0, sum = 0;

    for (int n : nums) {
        sum += n;
        // If (sum - k) seen before -> subarrays between sum to k
        if (prefixCount.count(sum - k))
            count += prefixCount[sum - k];
        prefixCount[sum]++;
    }

    return count;
}`,
      },
    ],
  },
  {
    id: "kadanes",
    label: "Kadane's Algorithm",
    color: "#E24B4A",
    variants: [
      {
        name: "Max subarray sum",
        code: `// Kadane's: maximum subarray sum — O(n) time, O(1) space
int maxSubArray(const vector<int>& nums) {
    int maxSum = nums[0];            // global max
    int curSum = nums[0];            // current window sum

    for (int i = 1; i < (int)nums.size(); i++) {
        // Either extend existing subarray or start fresh
        curSum = max(nums[i], curSum + nums[i]);
        maxSum = max(maxSum, curSum);
    }

    return maxSum;
}

// Variant: return subarray indices too
pair<int,int> maxSubArrayIndices(const vector<int>& nums) {
    int maxSum = nums[0], curSum = nums[0];
    int start = 0, end = 0, tempStart = 0;

    for (int i = 1; i < (int)nums.size(); i++) {
        if (nums[i] > curSum + nums[i]) {
            curSum = nums[i];
            tempStart = i;           // potential new start
        } else {
            curSum += nums[i];
        }
        if (curSum > maxSum) {
            maxSum = curSum;
            start = tempStart;
            end = i;
        }
    }

    return {start, end};             // subarray = nums[start..end]
}

// Max product subarray (track both min and max):
int maxProduct(const vector<int>& nums) {
    int maxP = nums[0], minP = nums[0], result = nums[0];

    for (int i = 1; i < (int)nums.size(); i++) {
        // Negative number flips min and max
        if (nums[i] < 0) swap(maxP, minP);
        maxP = max(nums[i], maxP * nums[i]);
        minP = min(nums[i], minP * nums[i]);
        result = max(result, maxP);
    }

    return result;
}`,
      },
    ],
  },
];
