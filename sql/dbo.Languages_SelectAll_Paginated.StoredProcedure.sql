CREATE PROC [dbo].[Languages_SelectAll_Paginated]  
			@PageIndex int
			,@PageSize int
	


/*

TEST CODE

Execute dbo.Languages_SelectAll_Paginated 0, 10

*/


AS
BEGIN

	Declare @offSet int = @PageIndex * @PageSize

        SELECT [Id]
			  ,[Code]
			  ,[Name]
			  ,TotalCount = COUNT(1) OVER()
        FROM    dbo.Languages
        ORDER BY [Id]

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
