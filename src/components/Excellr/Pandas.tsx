// import React, { useState } from 'react';

// const questions = [
//   {
//     key: "create-dataframe",
//     title: "1. Create DataFrame from Dictionary",
//     task: "How do you create a Pandas DataFrame from a dictionary?",
//     concepts: "Pandas, DataFrame",
//     description: "DataFrames can be created from dictionaries where keys become column names and values become the data.",
//     example: "Creating a DataFrame from sales data, converting survey responses into a structured format.",
//     code: `import pandas as pd

// data = {
//   'Name': ['Alice', 'Bob', 'Charlie'],
//   'Age': [25, 30, 35],
//   'City': ['New York', 'London', 'Paris']
// }

// df = pd.DataFrame(data)
// print(df)`
//   },
//   {
//     key: "read-csv",
//     title: "2. Read CSV File",
//     task: "How can you read a CSV file into a DataFrame?",
//     concepts: "Pandas, CSV",
//     description: "CSV files are a common data format that can be easily imported into Pandas DataFrames.",
//     example: "Loading sales records, importing survey data, or reading sensor measurements from a file.",
//     code: `import pandas as pd

// # Read CSV file
// df = pd.read_csv('data.csv')

// # Display first few rows
// print(df.head())`
//   },
//   {
//     key: "display-rows",
//     title: "3. Display First 10 Rows",
//     task: "What method would you use to display the first 10 rows of a DataFrame?",
//     concepts: "Pandas, DataFrame",
//     description: "Inspecting the first few rows helps understand the structure and content of your data.",
//     example: "Quickly checking imported data, verifying column names and data types.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Display first 10 rows
// print(df.head(10))`
//   },
//   {
//     key: "missing-values",
//     title: "4. Check for Missing Values",
//     task: "How do you check for missing values in a DataFrame?",
//     concepts: "Pandas, Missing Data",
//     description: "Identifying missing data is crucial for data cleaning and preprocessing.",
//     example: "Finding empty cells in survey responses, identifying gaps in time series data.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Check for missing values
// print(df.isnull().sum())`
//   },
//   {
//     key: "fill-missing",
//     title: "5. Fill Missing Values",
//     task: "How can you fill missing values in a DataFrame with the column mean?",
//     concepts: "Pandas, Missing Data",
//     description: "Imputing missing values helps maintain data integrity for analysis.",
//     example: "Replacing missing age values with average age, filling empty price fields with median price.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Fill missing values with column mean
// df.fillna(df.mean(), inplace=True)`
//   },
//   {
//     key: "drop-missing",
//     title: "6. Drop Rows with Missing Values",
//     task: "What method allows you to drop rows with missing values?",
//     concepts: "Pandas, Missing Data",
//     description: "Sometimes removing incomplete records is preferable to imputation.",
//     example: "Removing incomplete survey responses, dropping records with critical missing data.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Drop rows with any missing values
// df.dropna(inplace=True)`
//   },
//   {
//     key: "select-column",
//     title: "7. Select Specific Column",
//     task: "How do you select a specific column from a DataFrame?",
//     concepts: "Pandas, DataFrame",
//     description: "Column selection is fundamental for working with specific data attributes.",
//     example: "Extracting customer names from a database, isolating temperature readings from sensor data.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Select single column
// names = df['Name']

// # Select multiple columns
// subset = df[['Name', 'Age']]`
//   },
//   {
//     key: "filter-rows",
//     title: "8. Filter Rows by Column Value",
//     task: "How do you filter a DataFrame to include only rows where a column's value is greater than 100?",
//     concepts: "Pandas, DataFrame",
//     description: "Filtering helps focus analysis on relevant subsets of data.",
//     example: "Finding high-value transactions, identifying customers above a certain age.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Filter rows
// filtered_df = df[df['Value'] > 100]`
//   },
//   {
//     key: "loc-vs-iloc",
//     title: "9. Difference Between .loc[] and .iloc[]",
//     task: "What is the difference between .loc[] and .iloc[]?",
//     concepts: "Pandas, Indexing",
//     description: "Understanding label-based vs position-based indexing is crucial for data manipulation.",
//     example: "Selecting specific rows and columns by name or position.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Label-based selection
// subset1 = df.loc[0:5, ['Name', 'Age']]

// # Position-based selection
// subset2 = df.iloc[0:5, 0:2]`
//   },
//   {
//     key: "sort-dataframe",
//     title: "10. Sort DataFrame by Multiple Columns",
//     task: "How do you sort a DataFrame by multiple columns?",
//     concepts: "Pandas, Sorting",
//     description: "Sorting helps organize data for analysis and presentation.",
//     example: "Sorting sales data by region then by amount, ordering students by grade then by name.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Sort by multiple columns
// sorted_df = df.sort_values(['Region', 'Sales'], ascending=[True, False])`
//   },
//   {
//     key: "rename-columns",
//     title: "11. Rename Columns",
//     task: "How do you rename columns in a DataFrame?",
//     concepts: "Pandas, DataFrame",
//     description: "Clear column names improve code readability and analysis.",
//     example: "Standardizing column names, making headers more descriptive.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Rename columns
// df.rename(columns={'old_name': 'new_name'}, inplace=True)`
//   },
//   {
//     key: "apply-function",
//     title: "12. Apply Function to Each Row",
//     task: "What function allows you to apply a function to each row of a DataFrame?",
//     concepts: "Pandas, DataFrame",
//     description: "Row-wise operations enable complex data transformations.",
//     example: "Calculating derived values, normalizing data, or creating categorical labels.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Apply function to each row
// df['Category'] = df.apply(lambda row: 'High' if row['Value'] > 100 else 'Low', axis=1)`
//   },
//   {
//     key: "group-data",
//     title: "13. Group Data and Compute Mean",
//     task: "How do you group data in Pandas and compute an aggregate function like mean?",
//     concepts: "Pandas, GroupBy",
//     description: "Grouping enables powerful aggregate analysis of data subsets.",
//     example: "Calculating average sales by region, finding mean test scores by school.",
//     code: `import pandas as pd

// df = pd.read_csv('data.csv')

// # Group and aggregate
// result = df.groupby('Category')['Value'].mean()`
//   },
//   {
//     key: "merge-dataframes",
//     title: "14. Merge Two DataFrames",
//     task: "How can you merge two DataFrames based on a common column?",
//     concepts: "Pandas, Merging",
//     description: "Combining datasets is essential for comprehensive analysis.",
//     example: "Joining customer data with transaction history, combining product info with sales data.",
//     code: `import pandas as pd

// # Merge DataFrames
// merged_df = pd.merge(df1, df2, on='common_column')`
//   },
//   {
//     key: "pivot-dataframe",
//     title: "15. Pivot a DataFrame",
//     task: "What method allows you to pivot a DataFrame?",
//     concepts: "Pandas, Pivot",
//     description: "Pivoting reshapes data for different analytical perspectives.",
//     example: "Converting long-form data to wide-form, creating summary tables.",
//     code: `import pandas as pd

// # Pivot table
// pivot_df = df.pivot_table(index='Date', columns='Product', values='Sales', aggfunc='sum')`
//   },
//   {
//     key: "convert-datetime",
//     title: "16. Convert String to Datetime",
//     task: "How do you convert a column's data type from string to datetime?",
//     concepts: "Pandas, Datetime",
//     description: "Proper datetime formatting enables time-based analysis.",
//     example: "Analyzing trends over time, calculating durations between events.",
//     code: `import pandas as pd

// # Convert to datetime
// df['Date'] = pd.to_datetime(df['Date'])`
//   },
//   {
//     key: "value-counts",
//     title: "17. Use .value_counts()",
//     task: "What does .value_counts() do when applied to a column?",
//     concepts: "Pandas, DataFrame",
//     description: "Value counts provide quick frequency analysis of categorical data.",
//     example: "Counting occurrences of survey responses, analyzing product category distribution.",
//     code: `import pandas as pd

// # Count unique values
// counts = df['Category'].value_counts()`
//   },
//   {
//     key: "reset-index",
//     title: "18. Reset DataFrame Index",
//     task: "How can you reset the index of a DataFrame?",
//     concepts: "Pandas, Indexing",
//     description: "Resetting indexes helps when operations create complex multi-level indexes.",
//     example: "After groupby operations, when needing sequential row numbers.",
//     code: `import pandas as pd

// # Reset index
// df.reset_index(drop=True, inplace=True)`
//   },
//   {
//     key: "save-csv",
//     title: "19. Save DataFrame as CSV",
//     task: "How do you save a DataFrame as a CSV file?",
//     concepts: "Pandas, CSV",
//     description: "Saving data enables sharing results and preserving analysis outputs.",
//     example: "Exporting cleaned data, saving analysis results for reports.",
//     code: `import pandas as pd

// # Save to CSV
// df.to_csv('output.csv', index=False)`
//   },
//   {
//     key: "create-new-column",
//     title: "20. Create New Column Based on Conditions",
//     task: "How can you create a new column based on conditions applied to existing columns?",
//     concepts: "Pandas, DataFrame",
//     description: "Conditional column creation enables feature engineering and data categorization.",
//     example: "Creating age groups from birth dates, categorizing sales performance.",
//     code: `import pandas as pd
// import numpy as np

// # Create conditional column
// df['Status'] = np.where(df['Value'] > 100, 'High', 'Low')`
//   }
// ];

// const PandasQuestions = () => {
//   const [selected, setSelected] = useState('create-dataframe');
//   const selectedQuestion = questions.find(q => q.key === selected);

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-purple-100 p-5 min-h-screen">
//         <h2 className="mb-4 text-lg font-semibold">Pandas Practice Questions</h2>
//         <ul className="mt-10 space-y-2">
//           {questions.map((question) => (
//             <li 
//               key={question.key}
//               className={`cursor-pointer hover:text-purple-700 ${selected === question.key ? 'font-bold text-purple-800' : ''}`}
//               onClick={() => setSelected(question.key)}
//             >
//               {question.title}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 p-10">
//         {selectedQuestion && (
//           <div>
//             <h2 className="mb-4 text-xl font-bold">{selectedQuestion.title}</h2>
//             <p className="mb-2 text-lg"><strong>Task:</strong> {selectedQuestion.task}</p>
//             <p className="mb-2"><strong>Concepts:</strong> {selectedQuestion.concepts}</p>
//             <p className="mb-2"><strong>Description:</strong> {selectedQuestion.description}</p>
//             <p className="mb-2"><strong>Example:</strong> {selectedQuestion.example}</p>
            
//             <pre className="bg-gray-100 p-4 rounded mb-4">
//               {selectedQuestion.code}
//             </pre>
            
//             <div className="border-2 border-dashed border-gray-300 p-4 rounded h-40">
//               <p className="text-gray-500">Practice writing your Pandas code here</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PandasQuestions;