/*******************TEST CODE*******************

DECLARE @CreatedBy int = 3
		,@PageIndex int = 0
		,@PageSize int = 10
		,@Deleted bit = 0

EXECUTE dbo.Files_Select_ByCreatedBy_DeleteStatus
		@CreatedBy
		,@PageIndex
		,@PageSize
		,@Deleted

***********************************************/
CREATE PROC [dbo].[Files_Select_ByCreatedBy_DeleteStatus]
			@CreatedBy int
			,@PageIndex int
			,@PageSize int
			,@Deleted bit

AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT [F].[Id]
		  ,[F].[Name]
		  ,[Url]
		  ,[FileTypeId]
		  ,[FT].[Name]
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
	  WHERE [F].[CreatedBy] = @CreatedBy and (isDeleted = @Deleted)

	  ORDER BY F.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY 
END


GO
