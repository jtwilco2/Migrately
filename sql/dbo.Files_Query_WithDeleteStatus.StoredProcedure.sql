/*******************TEST CODE*******************

DECLARE @PageIndex int = 0
		,@PageSize int = 10
		,@Query nvarchar(100) = 'testing'
		,@Deleted bit = 0

EXECUTE [dbo].[Files_Query_WithDeleteStatus]
		@PageIndex
		,@PageSize
		,@Query
		,@Deleted


***********************************************/
CREATE PROC [dbo].[Files_Query_WithDeleteStatus]
			@PageIndex int
			,@PageSize int
			,@Query nvarchar(100)
			,@Deleted bit
AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT [F].[Id]
		  ,[F].[Name]
		  ,[Url]
		  ,[FileTypeId] as 'fileTypeId'
		  ,[FT].Name as 'FileTypeName'
		  ,[IsDeleted]
		  ,[CreatedBy]
		  ,[u].[FirstName]
		  ,[u].[LastName]
		  ,[F].[DateCreated]
		  ,[TotalCount] = COUNT(1) OVER()

	  FROM [dbo].[Files] as F 
		inner join [dbo].[FileTypes] as FT
			ON F.FileTypeId = FT.Id
		inner join [dbo].[Users] as u
			ON F.CreatedBy = u.Id
	  WHERE (F.Name LIKE '%' + @Query + '%') and (isDeleted = @Deleted)

	  ORDER BY F.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END
GO
